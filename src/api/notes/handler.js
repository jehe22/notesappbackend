class NotesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  postNoteHandler(request, h) {
    const { title = 'untitled', body, tags } = request.payload;
    this._validator.validateNotePayload(request.payload);
    const noteId = this._service.addNote({ title, body, tags });

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId,
      },
    });

    response.code(201);

    return response;
  }

  getNotesHandler(request, h) {
    const notes = this._service.getNotes();

    const response = h.response({
      status: 'success',
      data: {
        notes,
      },
    });

    response.code(200);

    return response;
  }

  getNoteByIdHandler(request, h) {
    const { id } = request.params;
    const note = this._service.getNoteById(id);

    const response = h.response({
      status: 'success',
      data: {
        note,
      },
    });

    response.code(200);

    return response;
  }

  putNoteByIdHandler(request, h) {
    const { id } = request.params;
    this._validator.validateNotePayload(request.payload);
    this._service.editNoteById(id, request.payload);

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });

    response.code(200);

    return response;
  }

  deleteNoteByIdHandler(request, h) {
    const { id } = request.params;
    this._service.deleteNoteById(id);

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });

    response.code(200);

    return response;
  }
}

module.exports = NotesHandler;

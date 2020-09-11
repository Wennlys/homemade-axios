import client from './client';

function create(body) {
    return client('list-items', { body });
}

function read() {
    return client('list-items');
}

function update(id, body) {
    return client(`list-items/${id}`, {
        method: 'PUT',
        body,
    });
}

function remove(id) {
    return client(`list-items/${id}`, { method: 'DELETE' });
}

export { create, read, remove, update };

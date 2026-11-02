/**
 * Entidade que representa um usuário do sistema gamificado.
 *
 * Atributos (vindos do backend): id, uid, name, email, role,
 * points, level, cellId.
 *
 * Observação: pontos e nível são calculados pelo backend.
 * O frontend apenas exibe, sem recalcular.
 */
export class User {

    constructor(data) {
        Object.assign(this, data);
        this.id = data.id;
        this.uid = data.uid;
        this.name = data.name;
        this.email = data.email;
        this.role = data.role;
        this.points = data.points ?? 0;
        this.level = data.level ?? 1;
        this.cellId = data.cellId; // pode estar ausente
    }
}
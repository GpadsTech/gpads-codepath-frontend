/**
 * Entidade responsável por representar o avatar de um usuário
 * dentro do sistema gamificado.
 *
 * Atributos: id, userId, name, level, image, customization, unlockedItems.
 *
 * Comportamentos:
 *  - hasItem: verifica se um item está desbloqueado
 *  - unlockItem: desbloqueia um item novo
 *  - equipItem: equipa um item (só se estiver desbloqueado)
 *  
 * Responsabilidade: guardar os dados do avatar e as regras de
 * desbloqueio e equipamento de itens.
 */
export class Avatar {

    constructor(data) {
        this.id = data.id;
        this.userId = data.userId; // confira no API_CONTRACT.md
        this.name = data.name;
        this.level = data.level;
        this.image = data.image;
        this.customization = data.customization ?? {};
        this.unlockedItems = data.unlockedItems ?? [];
    }

    hasItem(itemId) {
        return this.unlockedItems.includes(itemId);
    }

    unlockItem(itemId) {
        if (!this.hasItem(itemId)) {
            this.unlockedItems.push(itemId);
        }
    }

    equipItem(itemId) {
        if (!this.hasItem(itemId)) {
            throw new Error("Item não desbloqueado.");
        }
        this.customization.equipped = itemId;
    }
}
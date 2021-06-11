export class TableAttrib {
  constructor(attributes) {
    this.columns = attributes;
  }

  colData = (id) => {
    if (this.columns.find((col) => col.name === id) === undefined) return false;

    return this.columns.find((col) => col.name === id);
  };

  msg = (id) => {
    return `${id} no existe`;
  };

  getTitleHeader = (id) => {
    if (!this.colData(id)) return this.msg(id);

    return this.colData(id).title;
  };

  getCellValue = (id, value) => {
    if (!this.colData(id)) return this.msg(id);

    if (this.colData(id).type === 'number') {
      return value.toLocaleString('es-ES', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
    }
    return value;
  };

  getCellClass = (id) => {
    if (!this.colData(id)) return this.msg(id);

    return this.colData(id).class;
  };

  getCellAlign = (id) => {
    if (!this.colData(id)) return this.msg(id);

    return this.colData(id).aling;
  };

  isCellVisible = (id, role) => {
    if (!this.colData(id)) return this.msg(id);

    if (typeof this.colData(id).visible === 'boolean') {
      return this.colData(id).visible;
    }

    return this.colData(id).visible.includes(role) ? true : false;
  };

  isCellEditable = (id, role) => {
    if (!this.colData(id)) return this.msg(id);

    if (typeof this.colData(id).editable === 'boolean') {
      return this.colData(id).editable;
    }

    return this.colData(id).editable.includes(role) ? true : false;
  };
}

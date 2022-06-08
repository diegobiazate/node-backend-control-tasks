import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";

export interface CalledSectorInstance extends Model {
  id: number;
  id_called: number;
  id_sector: number;
}

export const CalledSector = sequelize.define<CalledSectorInstance>('CalledSector', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  id_called: {
    type: DataTypes.INTEGER
  },
  id_sector: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'setor_chamado',
  timestamps: false
});
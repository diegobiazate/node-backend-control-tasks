import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";

export interface CalledUserInstance extends Model {
  id: number;
  id_called: number;
  id_user: number;
}

export const CalledUser = sequelize.define<CalledUserInstance>('CalledUser', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  id_called: {
    type: DataTypes.INTEGER
  },
  id_user: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'usuario_chamado',
  timestamps: false
});
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";

export interface CalledInstance extends Model {
  id: number;
  title: string;
  description: string;
  status: string;
}

export const Called = sequelize.define<CalledInstance>('Called', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'chamados',
  timestamps: false
});
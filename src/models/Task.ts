import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface TaskInstance extends Model {
  id: number;
  id_user: number;
  title: string;
  description: string;
  status: number;
  priority: string;
}

export const Task = sequelize.define<TaskInstance>('Task', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  id_user: {
    type: DataTypes.INTEGER,
    unique: true
  },
  title: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.INTEGER
  },
  priority: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'tasks',
  timestamps: false
});
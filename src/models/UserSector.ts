import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface UserSectorInstance extends Model {
  id: number;
  id_user: number;
  id_sector: number;
}

export const UserSector = sequelize.define<UserSectorInstance>('UserSector', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  id_user: {
    type: DataTypes.INTEGER
  },
  id_sector: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'usuario_setor',
  timestamps: false
});
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";

export interface SectorInstance extends Model {
  id: number;
  sector_name: string;
  description: string;
}

export const Sector = sequelize.define<SectorInstance>('Sector', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  sector_name: {
    type: DataTypes.STRING,
    unique: true
  },
  description: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'setores',
  timestamps: false
})
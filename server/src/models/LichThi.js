const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const LichThi = sequelize.define(
	"LichThi",
	{
		MaLichThi: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		TenLichThi: {
			type: DataTypes.STRING(200),
			allowNull: false,
		},
		ThoiGianThi: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		SoLuongDaDangKi: {
			type: DataTypes.INTEGER,
		},
		SoLuongToiThieu: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: 1,
			},
		},
		SoLuongToiDa: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: 1,
			},
		},
	},
	{
		tableName: "LichThi",
		timestamps: false,
		validate: {
			soLuongHopLe() {
				if (this.SoLuongToiThieu > this.SoLuongToiDa) {
					throw new Error(
						"Số lượng tối thiểu không thể lớn hơn số lượng tối đa"
					);
				}
			},
		},
	}
);

module.exports = LichThi;

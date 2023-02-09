const validTypes =["Plante","Poison","Feu", "Insecte","Vol","Normal","Electrik","Fée"]

module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('Pokemon',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name: {
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty:{msg:" Un nom est indispensable au Pokemon. La chaine ne peut être vide"},
                notNull:{msg:"Le nom est une propriété requise"}
            },
            unique:{msg: " le nom du pokemon est déjà pris. Essayez en un autre"}
        },
        hp:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{
                isInt:{msg:'Utilisez uniquement des nombres entiers pour les points de vie '},
                notNull:{msg:'Les points de vie sont une propriété requise'},
                min:{args:[0], msg:"Les points de vie ne peuvent être inférieur à 0"},
                max:{args:[999],msg:"Les points de vie ne peuvent être supérieur à 999"}
            }
        },
        cp:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{ 
                isInt:{msg:"Utilisez des nombres entiers pour les points de dégats"},
                notNull:{msg:'les points de dégats sont une propriété requise'},
                min:{args:[0], msg:"Les dégats ne peuvent être inférieur à 0 "},
                max:{args:[99],msg:"Les dégats ne peuvent être supérieur à 99"}
            }
        },
        picture:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{ 
                isUrl:{msg:'Utilisez une url valide pour l\'adresse de l\'image'},
                notNull:{msg:"L'url de l'image est une propriété requise"}
            }
        },
        types:{
            type:DataTypes.STRING,
            allowNull:false,
            get(){// on définit un getter au sens de sequelize
                return this.getDataValue('types').split(',')

            },
            set(types){
                this.setDataValue('types',types.join())
            },
            validate:{
                isTypesValide(value){
                    if(!value){
                        throw new Error('Un pokemon doit avoir un type')
                    }
                    if(value.split(',').length > 3){
                        throw new Error('Un pokemon ne peut avoir plus de 3 types')
                    }
                    value.split(',').forEach(type =>{
                        if(!validTypes.includes(type)){
                            throw new Error(`le type doit appartenir à la liste suivante : ${validTypes}`)
                        }
                    })
                }
            }
        }
    },{
        timestamps:true,
        createdAt:'created',
        updateAt:true,
    })
}
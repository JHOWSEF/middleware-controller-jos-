const { Exception } = require('handlebars');
const { sequelize, Sequelize } = require('../config/database');
const bookModel = require("../models/books")(sequelize,Sequelize)

exports.showAll = (req,res)=> {

    bookModel.findAll(
        {
          order:[['title','ASC']]
    }
    ).then(results=> {
        console.log(results);
        res.render('showAllView',{ layout:false, results_form:results })
    }).catch(err => {
        res.status(500).send({message: "Error" + err.message})
    })


}

exports.insertData = (req,res) =>
{
    const bookData = {
        title:req.body.title,
        description:req.body.description
    };

    bookModel.create(bookData).then(data=> {
        console.log("Book inserted");
        res.redirect('/');
    }).catch(err => {
        console.log("Error" + err);
    })

}

exports.showForm = (req,res) =>{
    res.render("form",{layout:false})
}

exports.delete = (req, res) => {
    const id_param = req.params.id;
    bookModel.destroy({
        where: { id: id_param }
    }).then((result) => {
        if (!result) { 
            return res.status(404).json({
                message: "Book not found."
            });
        }
        res.redirect("/showall");
    }).catch((err) => {
        res.status(500).json({ message: "Internal server error." });
        console.log(err);
    });
}

exports.editform =  (req, res) =>{
    const id_param = req.params.id;
    bookModel.findByPk(id_param).then((result)=>{
        res.render("editform" , 
        {
            layout:false, 
            id:id_param,
            results_data:result})
    }).catch((err)=>{
        res.status(500).json({ message: "deu erro no edit..." });
        console.log(err);
    })

    
}

exports.update =  (req,res) => {
    bookModel.update({
        title: req.body.title,
        description: req.body.description
    },{
        where:{id:req.body.id_for_updating}
    }).then(anything =>{
        if(!anything){
            req.status(400).send({message:"An error ocurred."})
        }
        res.redirect('/showall');
    }).catch((err)=>{
        res.status(500).send({message:"Error when trying to access the database"})
    })
    
}
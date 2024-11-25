import express from 'express'
import {Book} from '../models/bookModel.js'

const router = express.Router();


//Route to Save a new Book
router.post('/', async (request, response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear 
        ){
            return response.status(400).send({
                message:"Send all the required fields."
            })
        }
        const newBook = {
            title : request.body.title,
            author : request.body.author,
            publishYear : request.body.publishYear 
        }
        const book = await Book.create(newBook);
        return response.status(201).send(book)
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message: error.message});
    }
});

//Route to GET all books
router.get('/', async (request, response)=>{
    try{
        const books = await Book.find({});
        return response.status(200).send({
            count : books.length,
            data : books
        });
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message: error.message});
    }
});

//Route to GET a book based on ID
router.get('/:id', async (request, response)=>{
    try{

        const {id} = request.params;
        const book = await Book.findById(id);

        return response.status(200).send(book)
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message: error.message});
    }
});

//Route to PUT a book based on ID
router.put('/:id', async (request, response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear 
        ){
            return response.status(400).send({
                message:"Send all the required fields."
            })
        }
        const {id} = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result){
           return response.status(404).send({message: "Book Not Found."});
        }

        return response.status(200).send({message: "Book updated Successfully."})
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message: error.message});
    }
});


//Route to DELETE a book based on ID
router.delete('/:id', async (request, response)=>{
    try{

        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).send({message: "Book Not Found."});
         }
 
         return response.status(200).send({message: "Book deleted Successfully."})
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message: error.message});
    }
});

export default router;
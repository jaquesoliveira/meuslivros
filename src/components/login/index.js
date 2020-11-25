import React, {useState} from 'react';
import './login.css';
import {Link, Redirect} from 'react-router-dom';

import firebase from '../../config/firebase'
import 'firebase/auth';

import {useSelector, useDispatch} from 'react-redux';

function Login() {
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();
    
    const dispatch = useDispatch();
    const logado = useSelector(state => state.usuarioEmail)

    function logar(){
        console.log('logar')
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(resultado => {
                setMsgTipo('sucesso');
                
                setTimeout(() => {
                    dispatch({type: 'LOG_IN', usuarioEmail: email})    
                }, 1000)                
            }).catch(erro => {
                setMsgTipo('erro');
            });

        console.log(logado)
    }

    function dislogar(){
        console.log('dislogar')
        firebase.auth().signInWithEmailAndPassword(email, senha)        
            .then(resultado => {
                setMsgTipo('sucesso');
                
                setTimeout(() => {
                    dispatch({type: 'LOG_OUT', usuarioEmail: null})    
                }, 1000)                
            }).catch(erro => {
                setMsgTipo('erro');
            });

            console.log(logado)
    }

    return (
        <div className="login-content d-flex align-items-center" >

            {
                //console.log(logado)
                useSelector(state => state.usuarioLogado) > 0 ? <Redirect to='/inicio' /> : null
            }

            <form className = "form-signin mx-auto">
                <div className="text-center mb-4">
                    <i class="far fa-smile-wink text-white fa-5x"></i>
                    <h1 className = "h3 mb-3 font-weight-normal text-white font-weight-bold" >Login</h1> 
                </div>
                            
                <input onChange={(e)=>setEmail(e.target.value)} type = "email" id = "inputEmail" className = "form-control my-2" placeholder = "Email"/>       
                <input onChange={(e)=>setSenha(e.target.value)} type = "password" id = "inputPassword" className = "form-control my-2" placeholder = "Senha"/>           
                
                <button onClick={logar} className = "btn btn-lg btn-login btn-block" type = "button" > Logar </button> 
                <button onClick={dislogar} className = "btn btn-lg btn-login btn-block" type = "button" > Dislogar </button> 

                <div className="msg-login text-white text-center my-5">
                    {msgTipo === 'sucesso' ?
                        <span><strong>Wow!</strong> Você está conectado! &#128526;</span>
                        : ''
                    }

                    {msgTipo === 'erro' ?    
                    <span><strong>Oops!</strong> Verifique se a senha e usuário estão corretos! &#128546;</span>
                    :''}
                </div>
                
                <div className="opcoes-login mt-5">
                <Link to='usuariorecuperarsenha' className = "mx-2" > Recuperar senha </Link> 
                <span className="text-white">&#9734;</span>
                <Link to='novousuario' className = "mx-2" > Quero Cadastrar </Link> 
                </div>
            </form>
        </div>
    )
}    
export default Login;
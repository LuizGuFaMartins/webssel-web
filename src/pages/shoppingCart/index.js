import React from "react";
import "./styles.css";

  function ShoppingCart() {
    const [codigoItem, setCodigoItem] = React.useState('');
    const [produto, setProduto] = React.useState('');
    const [preco, setPreco] = React.useState('');
    const [quantidade, setQuantidade] = React.useState('');
    const [valorTotal, setValorTotal] = React.useState('');
  
    const handleCodigoItemChange = (event) => {
      setCodigoItem(event.target.value);
    };
  
    const handleProdutoChange = (event) => {
      setProduto(event.target.value);
    };
  
    const handlePrecoChange = (event) => {
      setPreco(event.target.value);
    };
  
    const handleQuantidadeChange = (event) => {
      setQuantidade(event.target.value);
    };
  
    const handleValorTotalChange = (event) => {
      setValorTotal(event.target.value);
    };
  
      return (
      <div className="container">
          <div className="search-bar">
            <input type="text" placeholder="Buscar por nome do produto..."/>
          </div>
        <div className="boxcard">    
            <div className="card">
              <div className="card-body">
                <div className="form-groupcod">
               <label>Código do Item:</label>
                <span>ola</span>
                </div>
                <div className="form-group">
                  <label>Produto:</label>
                </div>
                <div>
                  <span>ola pessoas</span>
                </div>
                <div className="form-group">
                  <label>Preço:</label>
                </div>
                <div>
                  <span>ola pessoas</span>
                </div>
                <div className="form-group">
                  <label>Quantidade:</label>
                </div>
                <div>
                  <span>ola pessoas</span>
                </div>
                <div className="form-group">
                  <label>Valor total do item:</label>
                </div>
                <div>
                  <span>ola pessoas</span>
                </div>
                <div className="remove-button">
                  <button>Remover do carrinho</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  };
  
  export default ShoppingCart;

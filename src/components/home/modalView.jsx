import React from "react";


function ModalView(listFiltered) {
  const data = listFiltered;
  const {
    name,
    age,
    anotacoes,
    bairro,
    cep,
    complemento,
    cpf,
    email,
    endereco,
    escola,
    numero,
    parentesco,
    responsavel,
    serie,
    turma,
    turno,
    itinerario1,
    itinerario2,
    itinerario3,
    itinerario4
  } = data.listFiltered[0];

  return (
    <div>
      <h3 style={{display: "flex", flexDirection:"row"}}>Aluno: {name}</h3>
      <h3 style={{display: "flex", flexDirection:"row"}}>Data de nascimento: {age} | Serie: {serie} | Turma: {turma}</h3>
      <h3 style={{display: "flex", flexDirection:"row"}}>Escola: {escola} | Turno: {turno}</h3>
      <h3 style={{display: "flex", flexDirection:"row"}}>Endereço: {endereco}, {numero} - {complemento}</h3>
      <h3 style={{display: "flex", flexDirection:"row"}}>Bairro: {bairro} | Cep: {cep}</h3>
      <h3 style={{display: "flex", flexDirection:"row"}}>Obs: {anotacoes}</h3>
      <h3>{parentesco} : {responsavel}</h3>
      <h3>CPF: {cpf}</h3>
      <h3>Email: {email}</h3>
      <div style={{display:"flex", justifyContent:"space-evenly"}}>
        <span>
          {itinerario1[0] === "" ? "" : <h3> {itinerario1[3]} | Rota: {itinerario1[0]} |  Horário: {itinerario1[1]} | obs: {itinerario1[2]}</h3>}
          {itinerario2[0] === "" ? "" : <h3> {itinerario2[3]} | Rota: {itinerario2[0]} |  Horário: {itinerario2[1]} | obs: {itinerario2[2]}</h3>}
        </span>
        <span>
          {itinerario3[0] === "" ? "" : <h3> {itinerario3[3]} | Rota: {itinerario3[0]} |  Horário: {itinerario3[1]} | obs: {itinerario3[2]}</h3>}
          {itinerario4[0] === "" ? "" : <h3> {itinerario4[3]} | Rota: {itinerario4[0]} |  Horário: {itinerario4[1]} | obs: {itinerario4[2]}</h3>}
        </span>

      </div>
    </div>
  );
}

export default ModalView;

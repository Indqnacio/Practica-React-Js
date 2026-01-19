/**
   * Aqui tenemos todo la estructura de lo que mostramos en el dialog de mas info
   * @selectedCharacter es la informacion que pedimos al principio a la API
   * @relatedData los 3 obj(films,starShip,vehicles) que se llaman al escoger un user
   */
export default function MoreInfoDialogContent({ selectedCharacter, relatedData }) {
  //console.log("relatedData: " + JSON.stringify(relatedData) + " y selectedCharacter: " + JSON.stringify(selectedCharacter))
  return (
    <>
      <h2>{selectedCharacter?.name}</h2>
      <p>
        <strong>Altura:</strong> {selectedCharacter?.height} cm
      </p>
      <h3>Películas</h3>
      <ul>
        {relatedData?.films?.map((film, index) => (
          <li key={index}>{film.title}</li>
        ))}
      </ul>
      <h3>Naves espaciales</h3>
      <ul>
        {relatedData?.starships?.map((starship, index) => (
          <li key={index}>{starship.name}</li>
        ))}
      </ul>
      <h3>Vehículos</h3>
      <ul>
        {relatedData?.vehicles?.map((vehicle, index) => (
          <li key={index}>{vehicle.name}</li>
        ))}
      </ul>
    </>
  );
}

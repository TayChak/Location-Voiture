import React from 'react';


function client() {
  
  return (
    <div className="Container">
      <h1>Client Information</h1>
      <form>
        <label htmlFor="cin">CIN *</label>
        <input type="number" placeholder="cin" name="cin" />

        <label htmlFor="nom">Nom *</label>
        <input type="text" placeholder="Nom" name="nom" />

        <label htmlFor="prénom">Prénom *</label>
        <input type="text" placeholder="Prénom" name="prenom" />

        
        <label htmlFor="adresse">Adresse *</label>
        <input type="text" placeholder="adresse" name="adresse" />

        <label htmlFor="datenaissance">Date de Naissance *</label>
        <input type="date" placeholder="jj/mm/aaaa" name="datenaissance" />

        <label htmlFor="mail">Mail *</label>
        <input type="email" placeholder="exemple@test.com" name="mail" />

        <label htmlFor="telephone">Téléphone *</label>
        <input type="number" placeholder="Téléphone" name="telephone" />

        <label htmlFor="telephone2">Téléphone 2</label>
        <input type="number" placeholder="Téléphone2" name="telephone2" />

        <label htmlFor="permis">Permis *</label>
        <input type="texte" placeholder="permis" name="permis" />

        <label htmlFor="sexe">Sexe *</label>
        <div className="radio-group">
          <label>
            <input type="radio" name="sexe" value="H" /> Homme
          </label>
          <label>
            <input type="radio" name="sexe" value="F" /> Femme
          </label>
        </div>

        <div className="button-container">
          <button type="submit">Confirmer</button>
          <button type="reset">Annuler</button>
        </div>
      </form>
    </div>
  );
}

export default client;
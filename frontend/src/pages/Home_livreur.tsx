import React from 'react';
import CardItem from '@/components/CardItem';
import NavbarSimple from '@/components/NavbarSimple';


const Home_livreur = () => {
    return (
        <div>
          {/* Ajout de la Navbar simplifiée */}
          <NavbarSimple />
    
          <div className="p-4">
            <CardItem
              imageSrc="/delivery/delivery.png"
              title="L'aventure commence ici !"
              description="Livrez dès maintenant à des milliers de personnes dans votre ville !"
              buttonText="Prendre une commande"
              onClick={() => alert('Commande prise !')}
            />
    
            <CardItem
              imageSrc="/delivery/friend.png"
              title="Faites cette aventure à plusieurs !"
              description="Parrainez vos amis pour bénéficier d'avantages sociaux !"
              buttonText="Invitez mes amis"
              onClick={() => alert('Invitation envoyée !')}
            />
          </div>
        </div>
      );
}

export default Home_livreur
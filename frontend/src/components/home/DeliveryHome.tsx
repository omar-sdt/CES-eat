import { useNavigate } from 'react-router-dom';
import CardItem from '../CardItem';

const DeliveryHome = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="p-4">
                <CardItem
                    imageSrc="/delivery/delivery.png"
                    title="L'aventure commence ici !"
                    description="Livrez dès maintenant à des milliers de personnes dans votre ville !"
                    buttonText="Prendre une commande"
                    onClick={() => navigate('/orders-available')}
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

export default DeliveryHome
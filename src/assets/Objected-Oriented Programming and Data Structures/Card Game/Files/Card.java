public class Card {

    public Integer point;
    public String value;
    public CardType cardType; // Ploymorephsm

    public Card() {
        point = 0;
    }

    // This function returns the card short name (e.x. D10)
    public String getCardName() {
        return cardType.getTypeShortName() + this.value;
    }

}

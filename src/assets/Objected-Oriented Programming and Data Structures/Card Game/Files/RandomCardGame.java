import java.util.Collections;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.Random;

public class RandomCardGame {

    // Card set array
    public static ArrayList<Card> cardSet;

    // Used Card set array
    public static ArrayList<Card> usedCards;

    // Card Types
    public static CardType diamond, club, heart, spad;

    // Plyers
    public static ArrayList<Player> players;

    // Random Object
    public static Random rand;

    // Input scanner
    public static Scanner scanner;



    public static void main(String[] args) {

        boolean playAgain = true;

        while( playAgain ) {


            init();

            // Get players
            for (int i = 0; i < 4 ; i++) {
                System.out.print("Please Enter Player number " + (i+1) + " name (E.X: John Doe) => ");
                String playerName = scanner.nextLine();
                Player player = new Player(playerName);
                players.add(player);
            }

            dashboard(true);
            int round_number = 1;
            while ( cardSet.size() >= players.size() * 3 ) {

                int round_winner = 0;

                int player_1_sum_points = 0;
                int player_2_sum_points = 0;
                int player_3_sum_points = 0;
                int player_4_sum_points = 0;

                Card p1_1, p1_2, p1_3;
                Card p2_1, p2_2, p2_3;
                Card p3_1, p3_2, p3_3;
                Card p4_1, p4_2, p4_3;


                Collections.shuffle(cardSet);
                int  n1_1 = rand.nextInt(cardSet.size() + 0);
                p1_1 = cardSet.get(n1_1);
                player_1_sum_points = player_1_sum_points + p1_1.point;
                usedCards.add(cardSet.get(n1_1));
                cardSet.remove(n1_1);


                Collections.shuffle(cardSet);
                int  n1_2 = rand.nextInt(cardSet.size() + 0);
                p1_2 = cardSet.get(n1_2);
                player_1_sum_points = player_1_sum_points + p1_2.point;
                usedCards.add(cardSet.get(n1_2));
                cardSet.remove(n1_2);


                Collections.shuffle(cardSet);
                int  n1_3 = rand.nextInt(cardSet.size() + 0);
                p1_3 = cardSet.get(n1_3);
                player_1_sum_points = player_1_sum_points + p1_3.point;
                usedCards.add(cardSet.get(n1_3));
                cardSet.remove(n1_3);



                Collections.shuffle(cardSet);
                int  n2_1 = rand.nextInt(cardSet.size() + 0);
                p2_1 = cardSet.get(n2_1);
                player_2_sum_points = player_2_sum_points + p2_1.point;
                usedCards.add(cardSet.get(n2_1));
                cardSet.remove(n2_1);


                Collections.shuffle(cardSet);
                int  n2_2 = rand.nextInt(cardSet.size() + 0);
                p2_2 = cardSet.get(n2_2);
                player_2_sum_points = player_2_sum_points + p2_2.point;
                usedCards.add(cardSet.get(n2_2));
                cardSet.remove(n2_2);


                Collections.shuffle(cardSet);
                int  n2_3 = rand.nextInt(cardSet.size() + 0);
                p2_3 = cardSet.get(n2_3);
                player_2_sum_points = player_2_sum_points + p2_3.point;
                usedCards.add(cardSet.get(n2_3));
                cardSet.remove(n2_3);



                Collections.shuffle(cardSet);
                int  n3_1 = rand.nextInt(cardSet.size() + 0);
                p3_1 = cardSet.get(n3_1);
                player_3_sum_points = player_3_sum_points + p3_1.point;
                usedCards.add(cardSet.get(n3_1));
                cardSet.remove(n3_1);


                Collections.shuffle(cardSet);
                int  n3_2 = rand.nextInt(cardSet.size() + 0);
                p3_2 = cardSet.get(n3_2);
                player_3_sum_points = player_3_sum_points + p3_2.point;
                usedCards.add(cardSet.get(n3_2));
                cardSet.remove(n3_2);


                Collections.shuffle(cardSet);
                int  n3_3 = rand.nextInt(cardSet.size() + 0);
                p3_3 = cardSet.get(n3_3);
                player_3_sum_points = player_3_sum_points + p3_3.point;
                usedCards.add(cardSet.get(n3_3));
                cardSet.remove(n3_3);



                Collections.shuffle(cardSet);
                int  n4_1 = rand.nextInt(cardSet.size() + 0);
                p4_1 = cardSet.get(n4_1);
                player_4_sum_points = player_4_sum_points + p4_1.point;
                usedCards.add(cardSet.get(n4_1));
                cardSet.remove(n4_1);


                Collections.shuffle(cardSet);
                int  n4_2 = rand.nextInt(cardSet.size() + 0);
                p4_2 = cardSet.get(n4_2);
                player_4_sum_points = player_4_sum_points + p4_2.point;
                usedCards.add(cardSet.get(n4_2));
                cardSet.remove(n4_2);


                Collections.shuffle(cardSet);
                int  n4_3 = rand.nextInt(cardSet.size() + 0);
                p4_3 = cardSet.get(n4_3);
                player_4_sum_points = player_4_sum_points + p4_3.point;
                usedCards.add(cardSet.get(n4_3));
                cardSet.remove(n4_3);



                players.get(0).points = players.get(0).points + player_1_sum_points;
                players.get(0).roundPoints =  player_1_sum_points;
                players.get(1).points = players.get(1).points + player_2_sum_points;
                players.get(1).roundPoints =  player_2_sum_points;
                players.get(2).points = players.get(2).points + player_3_sum_points;
                players.get(2).roundPoints =  player_3_sum_points;
                players.get(3).points = players.get(3).points + player_4_sum_points;
                players.get(3).roundPoints =  player_4_sum_points;

                if ( player_2_sum_points > players.get(round_winner).roundPoints ){
                    round_winner = 1;
                }


                if ( player_3_sum_points > players.get(round_winner).roundPoints ){
                    round_winner = 2;
                }


                if ( player_4_sum_points > players.get(round_winner).roundPoints ){
                    round_winner = 3;
                }


                if ( player_1_sum_points > players.get(round_winner).roundPoints ){
                    round_winner = 0;
                }





                System.out.println("ROUND: " + round_number);
                System.out.print(players.get(0).name + ": ");
                System.out.print(p1_1.getCardName() + " " + p1_2.getCardName() + " " + p1_3.getCardName() + " | ");
                System.out.print("Sum = " + player_1_sum_points);

                if ( round_winner == 0 ) {
                    System.out.println(" | Winner");
                    players.get(0).winCount = players.get(0).winCount + 1;

                } else {
                    System.out.println();
                }


                System.out.print(players.get(1).name + ": ");
                System.out.print(p2_1.getCardName() + " " + p2_2.getCardName() + " " + p2_3.getCardName() + " | ");
                System.out.print("Sum = " + player_2_sum_points);

                if ( round_winner == 1) {
                    System.out.println(" | Winner");
                    players.get(1).winCount = players.get(1).winCount + 1;

                } else {
                    System.out.println();
                }

                System.out.print(players.get(2).name + ": ");
                System.out.print(p3_1.getCardName() + " " + p3_2.getCardName() + " " + p3_3.getCardName() + " | ");
                System.out.print("Sum = " + player_3_sum_points);

                if ( round_winner == 2) {
                    System.out.println(" | Winner");
                    players.get(2).winCount = players.get(2).winCount + 1;

                } else {
                    System.out.println();
                }

                System.out.print(players.get(3).name + ": ");
                System.out.print(p4_1.getCardName() + " " + p4_2.getCardName() + " " + p4_3.getCardName() + " | ");
                System.out.print("Sum = " + player_4_sum_points);

                if ( round_winner == 3) {
                    System.out.println(" | Winner");
                    players.get(3).winCount = players.get(3).winCount + 1;

                } else {
                    System.out.println();
                }


                round_number++;
                dashboard(false);
            }

            Player winner = players.get(0);
            for (int i = 1; i < players.size() ;i++ ) {
                if( players.get(i).points > winner.points ) {
                    winner = players.get(i);
                }
            }




            System.out.println(winner.name + " wins this game! Congrats!");

            // Unset variables
            cardSet         = null;
            usedCards       = null;
            diamond         = club = heart = spad = null;
            players         = null;
            rand            = null;
            // scanner         = null;

            String response;
            System.out.println(" Press Q to quit the game. Press N to start a new game...");
            System.out.print("Your response => ");
            response = scanner.nextLine();

            if ( response.toUpperCase().equals("Q") || response.equals("q"))
            {
                playAgain = false;
            } else {
                playAgain = true;
            }
        }

    }

    // Initalization
    public static void init() {

        // Declare Diamond Type
        diamond = new Diamond();

        // Declare Club Type
        club    = new Club();

        // Declare Heart Type
        heart   = new Heart();

        // Declare Spad Type
        spad    = new Spad();

        // Declare Input Scanner
        scanner = new Scanner( System.in );


        // Declare card set array
        cardSet = new ArrayList<Card>();

        // Declare used card set
        usedCards = new ArrayList<Card>();

        // Play again default value
        // playAgain = false;

        // Declare Random
        rand = new Random();

        // Fill up the card set with cards 25% done
        // Fill up with Diamond
        cardSet.addAll(fillUpCardSet(diamond));

        // Fill up with Heart
        cardSet.addAll(fillUpCardSet(heart));

        // Fill up with Club
        cardSet.addAll(fillUpCardSet(club));

        // Fill up with Spad
        cardSet.addAll(fillUpCardSet(spad));

        // Declare player list
        players = new ArrayList<Player>();

        //
        // System.out.print("Available cards: ");
        // Collections.shuffle(cardSet);
        // for (int i = 0; i < cardSet.size(); i++ ) {
        //     System.out.print(cardSet.get(i).getCardName() + " ");
        // }

    }

    public static ArrayList<Card> fillUpCardSet( CardType cardType ) {

        ArrayList<Card> par_cardSet = new ArrayList<Card>();

        for (int i = 1; i <= 13 ; i++) {
            Card toPushCard = new Card();
            toPushCard.point = i;
            toPushCard.value = Integer.toString(i);

            if ( i == 1 ) {
                toPushCard.value = "A";
            } else if (i == 10 ) {
                toPushCard.point = 0;
            }else if ( i == 11 ) {
                toPushCard.value = "J";
                toPushCard.point = 0;
            } else if ( i == 12 ) {
                toPushCard.value = "Q";
                toPushCard.point = 0;
            } else if ( i == 13 ) {
                toPushCard.value = "K";
                toPushCard.point = 0;
            }

            toPushCard.cardType = cardType;
            par_cardSet.add(toPushCard);
        }

        return par_cardSet;
    }

    public static void dashboard(boolean first) {
        System.out.print("Win count: ");
        for (int i = 0; i < players.size(); i++ ) {
            if ( first )
                System.out.print(players.get(i).name + " = 0\t") ;
            else
                System.out.print(players.get(i).name + " = " + players.get(i).winCount + "\t") ;

        }

        // New line
        System.out.println();

        System.out.print("Available cards: ");
        Collections.shuffle(cardSet);
        for (int i = 0; i < cardSet.size(); i++ ) {
            System.out.print(cardSet.get(i).getCardName() + " ");
        }
        System.out.println();
        System.out.println("Used cards:");
        System.out.print("C: ");
        for (int i = 0; i < usedCards.size(); i++ ) {
            if( usedCards.get(i).cardType.getTypeShortName() == 'C' )
                System.out.print(usedCards.get(i).getCardName() + " ");
        }
        System.out.println();

        System.out.print("D: ");
        for (int i = 0; i < usedCards.size(); i++ ) {
            if( usedCards.get(i).cardType.getTypeShortName() == 'D' )
                System.out.print(usedCards.get(i).getCardName() + " ");
        }

        System.out.println();

        System.out.print("H: ");
        for (int i = 0; i < usedCards.size(); i++ ) {
            if( usedCards.get(i).cardType.getTypeShortName() == 'H' )
                System.out.print(usedCards.get(i).getCardName() + " ");
        }

        System.out.println();

        System.out.print("S: ");
        for (int i = 0; i < usedCards.size(); i++ ) {
            if( usedCards.get(i).cardType.getTypeShortName() == 'S' )
                System.out.print(usedCards.get(i).getCardName() + " ");
        }



        // Used card later

        // New line
        System.out.println();
        System.out.println("Press ENTER to deal cards...");
        String enter = scanner.nextLine();


    }

}

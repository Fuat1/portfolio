public class Player {

    public Integer points;
    public Integer roundPoints;
    public String name;
    public Integer winCount;

    public Player() {
        points = 0;
        name = "unnamed";
        roundPoints = 0;
        winCount = 0;
    }

    public Player(String name) {
        points = 0;
        this.name = name;
        roundPoints = 0;
        winCount = 0;
    }

}

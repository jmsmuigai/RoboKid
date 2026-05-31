// ============================================================
// RoboKid Java Lesson: Creating a Smart Learning Robot!
// Alliance High School AI Innovation Club
// ============================================================

class RobotBrain {
    String modelName;
    int memoryGigabytes;
    boolean isSmart;

    // Constructor to create our robot
    public RobotBrain(String name, int memory) {
        this.modelName = name;
        this.memoryGigabytes = memory;
        this.isSmart = true;
        System.out.println("🤖 Brain activated: " + this.modelName);
    }

    // Method to teach words in mother tongue
    public void translateWord(String englishWord, String kikuyuWord) {
        System.out.println("✨ Brain translates: \"" + englishWord + "\" to Kikuyu is \"" + kikuyuWord + "\"");
    }
}

public class RoboKid {
    public static void main(String[] args) {
        System.out.println("🌟 Starting Alliance High School AI simulator...");
        
        // Instantiate a new RoboKid robot brain
        RobotBrain wanjikuBot = new RobotBrain("WanjikuBot-V1", 64);
        
        // Translate a word
        wanjikuBot.translateWord("mango", "iembe");
        wanjikuBot.translateWord("banana", "marigu");
        wanjikuBot.translateWord("water", "maaĩ");

        System.out.println("🎉 AI Brain training finished! Congratulations, code compiled.");
    }
}

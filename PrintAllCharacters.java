public class PrintAllCharacters {
    public static void main(String[] args) {
        System.out.println("Printing ASCII / Extended ASCII characters (0 to 255):");
        System.out.printf("%-10s %-15s %s\n", "Decimal", "Character", "Description");
        System.out.println("----------------------------------------------");

        for (char ch = 0; ch <= 255; ch++) {
            if (Character.isISOControl(ch)) {
                // Control characters are non-printable
                System.out.printf("%-10d %-15s (Control character)\n", (int) ch,
                        "\\u" + String.format("%04X", (int) ch));
            } else {
                System.out.printf("%-10d %-15c\n", (int) ch, ch);
            }
        }
    }
}

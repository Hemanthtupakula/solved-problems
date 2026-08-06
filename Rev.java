import java.util.Scanner;

public class Rev {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("==================================================");
        System.out.println("            STRING REVERSAL IN 3 TYPES            ");
        System.out.println("==================================================");
        System.out.print("Enter a string/sentence to reverse: ");
        
        if (scanner.hasNextLine()) {
            String input = scanner.nextLine();
            if (!input.trim().isEmpty()) {
                System.out.println("\nOriginal: \"" + input + "\"");
                System.out.println("--------------------------------------------------");
                
                // Type 1: Reverse the entire string
                String type1 = reverseEntireString(input);
                System.out.println("Type 1 (Reverse entire string):");
                System.out.println("  Result: \"" + type1 + "\"");
                
                // Type 2: Reverse the order of the words
                String type2 = reverseWordOrder(input);
                System.out.println("Type 2 (Reverse word order):");
                System.out.println("  Result: \"" + type2 + "\"");
                
                // Type 3: Reverse each word in place
                String type3 = reverseEachWord(input);
                System.out.println("Type 3 (Reverse each individual word):");
                System.out.println("  Result: \"" + type3 + "\"");
                System.out.println("==================================================");
            } else {
                System.out.println("Empty input. Exiting program.");
            }
        }
        scanner.close();
    }

    /**
     * Type 1: Reverses the entire string (character by character).
     * E.g., "iam in mits mca" -> "acm stim ni mai"
     */
    public static String reverseEntireString(String str) {
        if (str == null) return null;
        return new StringBuilder(str).reverse().toString();
    }

    /**
     * Type 2: Reverses the order of the words in the string.
     * E.g., "iam in mits mca" -> "mca mits in iam"
     */
    public static String reverseWordOrder(String str) {
        if (str == null || str.trim().isEmpty()) return str;
        String[] words = str.trim().split("\\s+");
        StringBuilder sb = new StringBuilder();
        for (int i = words.length - 1; i >= 0; i--) {
            sb.append(words[i]);
            if (i > 0) {
                sb.append(" ");
            }
        }
        return sb.toString();
    }

    /**
     * Type 3: Reverses each individual word in place.
     * E.g., "iam in mits mca" -> "mai ni stim acm"
     */
    public static String reverseEachWord(String str) {
        if (str == null || str.trim().isEmpty()) return str;
        String[] words = str.trim().split("\\s+");
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < words.length; i++) {
            sb.append(new StringBuilder(words[i]).reverse().toString());
            if (i < words.length - 1) {
                sb.append(" ");
            }
        }
        return sb.toString();
    }
}
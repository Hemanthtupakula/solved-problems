import java.util.Scanner;

public class Palindrome {

    public static void main(String[] args) {
        // Run a demo first using the user's example
        runDemo();

        Scanner scanner = new Scanner(System.in);
        System.out.println("\n==================================================");
        System.out.print("Enter your own string/sentence to process: ");
        if (scanner.hasNextLine()) {
            String input = scanner.nextLine();
            if (!input.trim().isEmpty()) {
                processString(input);
            } else {
                System.out.println("Empty input. Exiting program.");
            }
        }
        scanner.close();
    }

    /**
     * Processes a string in three ways and prints if each result is a palindrome.
     */
    public static void processString(String str) {
        System.out.println("\n--------------------------------------------------");
        System.out.println("Original String: \"" + str + "\"");
        System.out.println("Is Original a Palindrome? " + (isPalindrome(str) ? "YES" : "NO"));
        System.out.println("--------------------------------------------------");

        // --- WAY 1: Reverse the entire string ---
        String way1 = reverseEntireString(str);
        System.out.println("Way 1 (Reverse entire string):");
        System.out.println("  Result:        \"" + way1 + "\"");
        System.out.println("  Is Palindrome? " + (isPalindrome(way1) ? "YES" : "NO"));

        // --- WAY 2: Reverse the order of words ---
        String way2 = reverseWordOrder(str);
        System.out.println("\nWay 2 (Reverse word order):");
        System.out.println("  Result:        \"" + way2 + "\"");
        System.out.println("  Is Palindrome? " + (isPalindrome(way2) ? "YES" : "NO"));

        // --- WAY 3: Reverse each word ---
        String way3 = reverseEachWord(str);
        System.out.println("\nWay 3 (Reverse each word in place):");
        System.out.println("  Result:        \"" + way3 + "\"");
        System.out.println("  Is Palindrome? " + (isPalindrome(way3) ? "YES" : "NO"));
        System.out.println("==================================================");
    }

    /**
     * Way 1: Reverses the entire string (character by character).
     */
    public static String reverseEntireString(String str) {
        if (str == null) return null;
        return new StringBuilder(str).reverse().toString();
    }

    /**
     * Way 2: Reverses the order of words.
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
     * Way 3: Reverses each individual word in place.
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

    /**
     * Helper method to check if a string is a palindrome.
     * It ignores spaces, punctuation, and letter casing.
     */
    public static boolean isPalindrome(String str) {
        if (str == null) return false;
        String clean = str.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        if (clean.isEmpty()) return false;
        String reversed = new StringBuilder(clean).reverse().toString();
        return clean.equals(reversed);
    }

    /**
     * Runs a quick demo to showcase the outputs of the program.
     */
    private static void runDemo() {
        System.out.println("==================================================");
        System.out.println("          PALINDROME / REVERSAL DEMO              ");
        System.out.println("==================================================");
        processString("iam in mits mca");
    }
}

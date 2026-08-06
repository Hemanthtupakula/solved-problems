import java.util.Scanner;

public class SimpleRev {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a string: ");
        String str = sc.nextLine();
        
        // Split the string into words using spaces
        String[] words = str.split(" ");
        
        // ==================================================================
        // --- Type 1: Reverse the entire string character by character ---
        // ==================================================================
        String type1 = "";
        // Loop backwards from the last character to the first character
        for (int i = str.length() - 1; i >= 0; i--) {
            type1 += str.charAt(i); // Append each character to type1
        }
        System.out.println("Type 1 (Entire string reverse): " + type1);
        
        // ==================================================================
        // --- Type 2: Reverse only the order of the words ---
        // ==================================================================
        String type2 = "";
        // Loop backwards from the last word to the first word
        for (int i = words.length - 1; i >= 0; i--) {
            type2 += words[i];
            if (i > 0) {
                type2 += " "; // Add space between words
            }
        }
        System.out.println("Type 2 (Word order reverse): " + type2);
        
        // ==================================================================
        // --- Type 3: Reverse the characters of each individual word ---
        // ==================================================================
        String type3 = "";
        // Loop forward through each word
        for (int i = 0; i < words.length; i++) {
            String currentWord = words[i];
            String reversedWord = "";
            
            // Reverse the characters of the current word using a loop
            for (int j = currentWord.length() - 1; j >= 0; j--) {
                reversedWord += currentWord.charAt(j);
            }
            
            type3 += reversedWord;
            if (i < words.length - 1) {
                type3 += " "; // Add space between words
            }
        }
        System.out.println("Type 3 (Each word reverse): " + type3);
        
        sc.close();
    }
}

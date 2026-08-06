public class RemoveSpaces {
    public static void main(String[] args) {
        String original = "Hello World! This is a test string.";
        
        // Remove spaces using StringBuilder
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < original.length(); i++) {
            char ch = original.charAt(i);
            // Append only if the character is not a space
            if (ch != ' ') {
                sb.append(ch);
            }
        }
        String result = sb.toString();
        
        System.out.println("Original String: \"" + original + "\"");
        System.out.println("Without Spaces:  \"" + result + "\"");
    }
}

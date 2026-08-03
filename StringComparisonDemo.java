public class StringComparisonDemo {
    public static void main(String[] args) {
        // 1. String Literal (uses String Pool)
        String s1 = "hello";
        String s2 = "hello"; // points to the same object in the String Pool

        // 2. New String Object (forces creation of a new object in the Heap)
        String s3 = new String("hello");
        String s4 = new String("hello"); // points to a different object in the Heap

        System.out.println("--- String Comparison Demonstration ---");
        System.out.println("s1 (literal): \"" + s1 + "\"");
        System.out.println("s2 (literal): \"" + s2 + "\"");
        System.out.println("s3 (new String): \"" + s3 + "\"");
        System.out.println("s4 (new String): \"" + s4 + "\"\n");

        // Comparing using '==' (compares memory references/addresses)
        System.out.println("Using '==' comparison (Memory address comparison):");
        System.out.println("s1 == s2: " + (s1 == s2) + "  (True, because both point to the same String Pool object)");
        System.out.println("s1 == s3: " + (s1 == s3) + " (False, because s3 is in the Heap, s1 is in the Pool)");
        System.out.println("s3 == s4: " + (s3 == s4) + " (False, because both are separate objects in the Heap)\n");

        // Comparing using '.equals()' (compares content/value)
        System.out.println("Using '.equals()' comparison (Content comparison):");
        System.out.println("s1.equals(s2): " + s1.equals(s2) + " (True, content is identical)");
        System.out.println("s1.equals(s3): " + s1.equals(s3) + " (True, content is identical)");
        System.out.println("s3.equals(s4): " + s3.equals(s4) + " (True, content is identical)");
    }
}

public class PrintAlphabets {
    public static void main(String[] args) {
        System.out.println("Uppercase Alphabets:");
        for (char ch = 'A'; ch <= 'Z'; ch++) {
            System.out.print(ch + " ");
        }
        System.out.println("\n");

        System.out.println("Lowercase Alphabets:");
        for (char ch = 'a'; ch <= 'z'; ch++) {
            System.out.print(ch + " ");
        }
        System.out.println();
    }
}

public class ExceptionDemo {
    public static void main(String[] args) {
        System.out.println("Starting the program...");

        try {
            // Division by zero (ArithmeticException)
            int numerator = 10;
            int denominator = 0;
            int result = numerator / denominator;
            System.out.println("Result: " + result); // This line will not be executed

        } catch (ArithmeticException e) {
            System.out.println("Caught an ArithmeticException: " + e.getMessage());
        }

        try {
            // Accessing out of bounds array element (ArrayIndexOutOfBoundsException)
            int[] numbers = {1, 2, 3};
            System.out.println("Accessing element at index 5: " + numbers[5]); // This line throws an exception

        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Caught an ArrayIndexOutOfBoundsException: " + e.getMessage());
        } finally {
            System.out.println("This 'finally' block is always executed.");
        }

        System.out.println("Program finished successfully!");
    }
}

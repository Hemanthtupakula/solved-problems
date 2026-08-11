import java.util.Arrays;
import java.util.List;

public class ArraysAsListDemo {
    public static void main(String[] args) {
        System.out.println("=== 1. Basic Usage of Arrays.asList ===");
        // Creating an array of Strings
        String[] colorsArray = {"Red", "Green", "Blue"};
        
        // Converting array to List using Arrays.asList
        List<String> colorsList = Arrays.asList(colorsArray);
        System.out.println("Original Array: " + Arrays.toString(colorsArray));
        System.out.println("Converted List: " + colorsList);

        System.out.println("\n=== 2. Write-Through Behavior (Shared Data Source) ===");
        // The list is backed by the array. Modifying the list modifies the array.
        colorsList.set(0, "Yellow");
        System.out.println("After modifying list index 0 to 'Yellow':");
        System.out.println("Colors List: " + colorsList);
        System.out.println("Colors Array: " + Arrays.toString(colorsArray));

        // Modifying the array also modifies the list
        colorsArray[2] = "Purple";
        System.out.println("After modifying array index 2 to 'Purple':");
        System.out.println("Colors List: " + colorsList);
        System.out.println("Colors Array: " + Arrays.toString(colorsArray));

        System.out.println("\n=== 3. Fixed-Size Constraint ===");
        // Since the list is backed by a fixed-size array, you cannot add or remove elements.
        try {
            colorsList.add("Orange");
        } catch (UnsupportedOperationException e) {
            System.out.println("Caught Expected Exception on colorsList.add(): " + e.getClass().getSimpleName());
        }

        try {
            colorsList.remove(0);
        } catch (UnsupportedOperationException e) {
            System.out.println("Caught Expected Exception on colorsList.remove(): " + e.getClass().getSimpleName());
        }

        System.out.println("\n=== 4. Working with Primitives Gotcha ===");
        int[] primitiveArray = {1, 2, 3};
        // Arrays.asList(primitiveArray) creates a List<int[]> instead of List<Integer>!
        List<int[]> wrappedPrimitiveList = Arrays.asList(primitiveArray);
        System.out.println("Size of List<int[]>: " + wrappedPrimitiveList.size()); // Prints 1
        System.out.println("First element in List: " + Arrays.toString(wrappedPrimitiveList.get(0)));

        // To get a List<Integer> from int[], use streams or Integer[]
        Integer[] wrapperArray = {1, 2, 3};
        List<Integer> integerList = Arrays.asList(wrapperArray);
        System.out.println("Size of List<Integer> (using wrapper array): " + integerList.size()); // Prints 3

        System.out.println("\n=== 5. Creating a Modifiable List ===");
        // If you need a fully modifiable list (where you can add/remove elements),
        // pass the list returned by Arrays.asList to the ArrayList constructor:
        List<String> modifiableList = new java.util.ArrayList<>(Arrays.asList(colorsArray));
        modifiableList.add("Orange");
        modifiableList.remove("Yellow");
        System.out.println("Modifiable List: " + modifiableList);
        System.out.println("Original Array remains unchanged: " + Arrays.toString(colorsArray));
    }
}

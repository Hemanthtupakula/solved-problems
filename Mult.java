public class Mult {
    public static void main(String[] args) {
        int count = 0;
        for (int i = 1; i <= 6; i++) {
            for (int j = 1; j < 6; j++) {
                if (count < 10) {
                    System.out.print("0" + i * j + " ");
                } else {
                    System.out.print(i * j + "  ");
                }
                count++;

            }
            System.out.println();

        }

    }
}

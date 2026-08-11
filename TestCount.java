class Count {
    private int count = 0;

    // By adding the 'synchronized' keyword, we guarantee that only one thread
    // can execute the increment() method at any given time.
    public synchronized void increment() {
        count++;
    }

    public int getCount() {
        return count;
    }
}

public class TestCount {
    public static void main(String[] args) throws InterruptedException {
        Count c = new Count();

        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 100000; i++) {
                c.increment();
            }
        });

        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 100000; i++) {
                c.increment();
            }
        });

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println("Final Count: " + c.getCount());
    }
}

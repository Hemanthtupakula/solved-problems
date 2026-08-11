// A custom thread class that extends the java.lang.Thread class
class MyThread extends Thread {
    
    // Constructor to set the thread name
    public MyThread(String name) {
        super(name); // Pass the name to the parent Thread constructor
    }

    // The run() method contains the code that is executed by the thread.
    // We override this method from the Thread class.
    @Override
    public void run() {
        System.out.println(getName() + " has started.");
        
        try {
            for (int i = 1; i <= 5; i++) {
                System.out.println(getName() + " is processing item " + i);
                // Pause execution for 500 milliseconds (0.5 seconds)
                Thread.sleep(500);
            }
        } catch (InterruptedException e) {
            System.out.println(getName() + " was interrupted.");
        }
        
        System.out.println(getName() + " has finished.");
    }
}

public class ThreadExtendDemo {
    public static void main(String[] args) {
        System.out.println("Main thread starting.");

        // Creating thread instances
        MyThread thread1 = new MyThread("Thread-A");
        MyThread thread2 = new MyThread("Thread-B");

        // Starting the threads
        // The start() method creates a new execution context and calls run() automatically
        thread1.start();
        thread2.start();

        // Wait for both threads to finish using join()
        try {
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            System.out.println("Main thread was interrupted.");
        }

        System.out.println("Main thread finished.");
    }
}

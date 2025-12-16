using System;

class PyramidDemo
{
    public static string[] CreatePyramidFromCenter(int n)
    {
        // n is the number of stars in the bottom row
        // Calculate number of rows needed
        int rows = (n + 1) / 2;
        string[] triangle = new string[rows];

        int mid = n / 2; // Middle index

        for (int i = 0; i < rows; i++)
        {
            char[] row = new char[n];

            // Fill with spaces first
            for (int j = 0; j < n; j++)
            {
                row[j] = ' ';
            }

            // Place stars symmetrically from center
            int left = mid - i;
            int right = mid + i;

            for (int j = left; j <= right; j++)
            {
                row[j] = '*';
            }

            triangle[i] = new string(row);
        }

        return triangle;
    }

    static void Main(string[] args)
    {
        Console.WriteLine("Pyramid Demo - Creating pyramid from center\n");

        // Example with n = 9
        Console.WriteLine("Pyramid with n = 9:");
        string[] pyramid9 = CreatePyramidFromCenter(9);
        foreach (string row in pyramid9)
        {
            Console.WriteLine(row);
        }

        Console.WriteLine("\n" + new string('-', 40) + "\n");

        // Example with n = 7
        Console.WriteLine("Pyramid with n = 7:");
        string[] pyramid7 = CreatePyramidFromCenter(7);
        foreach (string row in pyramid7)
        {
            Console.WriteLine(row);
        }

        Console.WriteLine("\n" + new string('-', 40) + "\n");

        // Example with n = 11
        Console.WriteLine("Pyramid with n = 11:");
        string[] pyramid11 = CreatePyramidFromCenter(11);
        foreach (string row in pyramid11)
        {
            Console.WriteLine(row);
        }

        Console.WriteLine("\nPress any key to exit...");
        Console.ReadKey();
    }
}

package main.java.visualizer.core;

import javax.swing.*;
import java.awt.*;

public class BarGraphPanel extends JPanel {
    private int[] vals;
    private boolean isSorted = false;
    private int comparingIdx1 = -1;
    private int comparingIdx2 = -1;

    public BarGraphPanel(int[] v) {
        vals = v;
    }

    public void setValues(int[] v) {
        vals = v;
        isSorted = false;
        repaint(); 
    }

    public void setComparingIndices(int indx1, int indx2) {
        comparingIdx1 = indx1;
        comparingIdx2 = indx2;
    }

    public void markAsSorted() {
        isSorted = true;
        repaint();
    }

    public int[] getValues() {
        return vals;
    }

    @Override
    protected void paintComponent(Graphics gra) {
        super.paintComponent(gra);
        if (vals == null || vals.length == 0) {
            return;
        }

        int width = getWidth();
        int height = getHeight();
        int barWidth = Math.max(5, width / vals.length);

        int max = Integer.MIN_VALUE;

        for(int val : vals) {
            max = Math.max(max, val);
        }

        for (int i = 0; i < vals.length; i++) {
            int value = vals[i];
            int barHeight = (int)((double)value / (double)max * (height - 2));

            if (isSorted) {
                gra.setColor(Color.GREEN);
            } else if (i == comparingIdx1 || i == comparingIdx2) {
                gra.setColor(Color.RED); 
            } else {
                gra.setColor(Color.BLUE);
            }

            gra.fillRect(i * barWidth, height - barHeight, barWidth - 2, barHeight);
        }
    }
}

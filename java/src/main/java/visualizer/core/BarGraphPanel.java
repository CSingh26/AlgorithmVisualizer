package main.java.visualizer.core;

import javax.swing.*;
import java.awt.*;

public class BarGraphPanel extends JPanel {
    private int[] vals;

    public BarGraphPanel(int[] v) {
        vals = v;
    }

    public void setValues(int[] v) {
        vals = v;
        repaint(); 
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

        gra.setColor(Color.BLUE);

        for (int i = 0; i < vals.length; i++) {
            int value = vals[i];
            int barHeight = (int)((double)value / (double)max * (height - 2));
            gra.fillRect(i * barWidth, height - barHeight, barWidth - 2, barHeight);
        }
    }
}

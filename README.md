# RDUTimer v1.0.0

**Lightweight jQuery time picker** with:

- Configurable **stepHour** & **stepMinute**  
- Support for **12-hour (AM/PM)** and **24-hour** modes  
- Customizable **initial/default time**  
- Built-in clock icon and responsive styling  

## 🚀 Quick Start

1. **Include CSS & JS**  
   ```html
   <link rel="stylesheet" href="css/RDUTimer.css">
   <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
   <script src="js/RDUTimer.js"></script>

2. **Initialize**
    ```html
    $(document).ready(function () {
      $('.timepicker').RDUTimer({
        stepMinute: 15,         // minute step
        stepHour: 1,      // hour step
        format: '24',     // '12' for 12-hour with AM/PM or '24'
        initialTime: '04:30' // optional, format depends on format setting (exam: 08:30 PM / 20:30)
      });
    });

3. **HTML**
    ```html
    <div class="timepicker"></div>

4. **Live Demo**

    Try it online on JSFiddle: https://jsfiddle.net/sytark/8ge30vpu/1/

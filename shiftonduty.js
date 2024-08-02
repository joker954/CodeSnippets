   console.log(ShiftOnDuty("2024-08-01"));

   function ShiftOnDuty(date = "") {
        const shiftStructure = 'ABC'; // SHIFT FORMAT (NO SPACES)
        const shiftStart = "2024-01-03"; // FIRST A SHIFT OF THE YEAR
    
        const year = new Date(date).getFullYear();
        const yearStart = `${year}-01-01`;
        const start_of_year = new Date(yearStart);
        const shift_start = new Date(shiftStart);
        const shift_format = shiftStructure.replace(/ /g, '');
    
        let shift_on_duty;
        if (shift_format.includes(',')) {
            shift_on_duty = shift_format.split(',').map(s => s.trim()).filter(s => s);
        } else {
            shift_on_duty = shift_format.split('');
        }
    
        const shift_length = shift_on_duty.length;
    
        const day_to_test = new Date(date);
        const dDiff = Math.abs((day_to_test - shift_start) / (1000 * 3600 * 24));
    
        let currentShift;
        if (day_to_test < shift_start) {
            const diff_from_year_start = Math.abs((day_to_test - start_of_year) / (1000 * 3600 * 24));
    
            const start_pattern_offset = Math.abs((shift_start - start_of_year) / (1000 * 3600 * 24)) % shift_length;
            const days_from_year_start = Math.floor(diff_from_year_start);
    
            let pattern_total;
            if (start_pattern_offset > 0) {
                pattern_total = shift_format.length - start_pattern_offset;
            } else {
                pattern_total = 0;
            }
            currentShift = (days_from_year_start + pattern_total) % shift_length;
        } else {
            currentShift = Math.floor(dDiff) % shift_length;
        }
    
        return shift_on_duty[currentShift];
    }
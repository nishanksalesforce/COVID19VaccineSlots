import { LightningElement, track } from 'lwc';
import getCovidVaccineSlots from '@salesforce/apex/CovidVaccineAvailabilityController.getCovidVaccineSlots';

export default class CovidVaccineAvailability extends LightningElement {
  @track pincode;
  @track date;
  @track slotAvailability;
  @track error;
  @track loading = false;

  handlePincodeChange(event) {
    this.pincode = event.target.value;
  }

  handleDateChange(event) {
    this.date = event.target.value;
  }

  async handleSearchClick() {
    this.loading = true;
    this.error = undefined;
    this.slotAvailability = undefined;
    try {
      const result = await getCovidVaccineSlots({ pincode: this.pincode, dateValue: this.date });
      if (result && result.length > 0) {
        this.slotAvailability = result;
      } else {
        this.error = 'No slots available for the selected date.';
      }
    } catch (error) {
      this.error = error.body.message;
    } finally {
      this.loading = false;
    }
  }
}

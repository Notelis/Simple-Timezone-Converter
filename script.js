const timezones = Intl.supportedValuesOf('timeZone');
const fromSelect = document.getElementById('fromTimezone');
const toSelect = document.getElementById('toTimezone');
const resultDiv = document.getElementById('result');
const convertBtn = document.getElementById('convertBtn');

timezones.forEach(tz => {
  fromSelect.add(new Option(tz, tz));
  toSelect.add(new Option(tz, tz));
});

fromSelect.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
toSelect.value = "UTC";

function convertTime() {
  const timeValue = document.getElementById('timeInput').value;
  if (!timeValue) {
    resultDiv.innerText = "Please enter a time";
    // Show the result div
    resultDiv.style.display = 'block';
    return;
  }

  const [hours, minutes] = timeValue.split(":").map(Number);
  const fromTZ = fromSelect.value;
  const toTZ = toSelect.value;

  const today = new Date();
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);

  const options = {
    timeZone: toTZ,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };

  const converted = new Intl.DateTimeFormat('en-US', options).format(date);

  const fromCity = fromTZ.split("/").pop().replace(/_/g, " ");
  const toCity = toTZ.split("/").pop().replace(/_/g, " ");

  resultDiv.innerText =
  `${timeValue} in ${fromCity} is ${converted} in ${toCity}`;

  resultDiv.style.display = 'block';
}

convertBtn.addEventListener('click', convertTime);
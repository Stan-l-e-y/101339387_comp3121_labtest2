export default function DayWeather({ day, temp, icon, selected = false }) {
  const image = `https://openweathermap.org/img/wn/${icon}.png`;
  return (
    <div
      className={`flex flex-col items-center px-2 text-black p-2 py-3  ${
        selected ? 'bg-[#ffffff] rounded-[1rem]' : ''
      }`}
    >
      {icon == 'image' ? (
        <div>Image</div>
      ) : (
        <img src={image} alt="weather icon" />
      )}
      <div className="font-bold">{day}</div>
      <div className="text-xs mt-2">{temp}</div>
    </div>
  );
}

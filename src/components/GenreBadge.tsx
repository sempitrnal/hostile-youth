const GenreBadge = ({ genre }: { genre: string }) => {
  return (
    <p className="w-max rounded-md bg-yellow-300 p-1 px-2 text-[12px] font-semibold text-stone-800 dark:bg-yellow-300">
      {genre}
    </p>
  );
};

export default GenreBadge;

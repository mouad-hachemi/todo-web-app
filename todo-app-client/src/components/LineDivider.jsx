const LineDivider = ({ text }) => {
    return (
        <div className="flex items-center py-1">
            <hr className="flex-grow h-px border-t-0 bg-gradient-to-r from-transparent to-gray-300" />
            <span className="mx-2 flex-shrink text-xs text-gray-500 font-semibold">{text}</span>
            <hr className="flex-grow h-px border-t-0 bg-gradient-to-r from-gray-300 to-transparent" />
        </div>
    );
};

export default LineDivider;
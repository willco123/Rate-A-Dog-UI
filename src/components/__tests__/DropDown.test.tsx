// import * as React from "react";
// import { screen } from "@testing-library/react";
// import DropDown from "../drop-down/DropDown.js";
// import { setup } from "../../test-helpers/user-event-setup.js";

// const onChange = jest.fn();
// afterEach(() => {
//   jest.clearAllMocks();
//   jest.restoreAllMocks();
// });

// describe("DropDown", () => {
//   it("should render ", () => {
//     setup(
//       <DropDown
//         items={["first", "second", null]}
//         isActive={true}
//         onChange={onChange}
//       />,
//     );
//     expect(screen.getByRole("combobox")).toBeInTheDocument();
//     const options = screen.getAllByRole("option");
//     expect(options.length).toBe(3);
//     expect(screen.getByText("first")).toBeInTheDocument();
//   });
//   it("select first on click ", async () => {
//     const { user } = setup(
//       <DropDown
//         items={["first", "second", "third"]}
//         isActive={true}
//         onChange={onChange}
//       />,
//     );
//     const options = screen.getAllByRole("option") as HTMLOptionElement[];
//     expect(options[0].selected).toBeTruthy();
//     expect(options[1].selected).toBeFalsy();
//     expect(options[2].selected).toBeFalsy();

//     const select = screen.getByRole("combobox");
//     await user.selectOptions(select, "third");
//     expect(options[0].selected).toBeFalsy();
//     expect(options[1].selected).toBeFalsy();
//     expect(options[2].selected).toBeTruthy();
//     expect(onChange).toHaveBeenCalledTimes(1);
//   });
// });

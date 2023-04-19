import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import Select from "react-select";
import {
  CreateUserSquema,
  CreateUserType,
  gender_options,
  status_options,
} from "~/domain/user";
// import createProductSquema, { CreateProduct } from "~/squemas/createProduct";

export type UserFormProps = {
  onSuccess: SubmitHandler<CreateUserType>;
  onCancel: () => void;
};

const UserForm = ({ onSuccess, onCancel }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateUserType>({
    resolver: zodResolver(CreateUserSquema),
  });

  const {
    field: { value: genderValue, onChange: genderOnChange, ...restGenderField },
  } = useController({ name: "gender", control });

  const {
    field: { value: statusValue, onChange: statusOnChange, ...restStatusField },
  } = useController({ name: "status", control });

  return (
    <form
      onSubmit={handleSubmit(onSuccess)}
      // hidden={!showCreateProduct}
      className={clsx(
        "grid grid-cols-2 gap-2 rounded-xl border-[1px] border-gray-600 bg-white p-2 text-lg font-bold"
      )}
    >
      <div className="form-control col-start-1 col-end-3 w-full">
        <label className="label">
          <span className="label-text">Nombre del Producto</span>
        </label>
        <input
          type="text"
          placeholder="Nombre"
          className="input-bordered input w-full "
          {...register("name")}
        />
        {errors.name && (
          <label className="label">
            <span />
            <span className="label-text text-error">{errors.name.message}</span>
          </label>
        )}
      </div>

      <div className="form-control col-start-1 col-end-3 w-full">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          className="input-bordered input w-full"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <label className="label">
            <span />
            <span className="label-text text-error">
              {errors.email.message}
            </span>
          </label>
        )}
      </div>
      <div className="form-control ">
        <label className="label">
          <span className="label-text">Gender</span>
        </label>
        <Select
          className="select-input"
          placeholder="Gender"
          isClearable
          options={gender_options}
          value={
            genderValue
              ? gender_options.find((x) => x.value === genderValue)
              : genderValue
          }
          onChange={(option) => genderOnChange(option ? option.value : option)}
          {...restGenderField}
        />
        {errors.gender && (
          <label className="label">
            <span />
            <span className="label-text text-error">
              {errors.gender.message}
            </span>
          </label>
        )}
      </div>
      <div className="form-control ">
        <label className="label">
          <span className="label-text">Status</span>
        </label>
        <Select
          className="select-input"
          placeholder="Status"
          isClearable
          options={status_options}
          value={
            statusValue
              ? status_options.find((x) => x.value === statusValue)
              : statusValue
          }
          onChange={(option) => statusOnChange(option ? option.value : option)}
          {...restGenderField}
        />
        {errors.status && (
          <label className="label">
            <span />
            <span className="label-text text-error">
              {errors.status.message}
            </span>
          </label>
        )}
      </div>
      <div className="col-start-1 col-end-3 flex w-full justify-end space-x-2 pt-2">
        <button className="btn-success btn">Crear</button>
        <button className="btn-error btn" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default UserForm;

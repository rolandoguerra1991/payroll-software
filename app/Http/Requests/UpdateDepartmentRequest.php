<?php

namespace App\Http\Requests;

use App\Models\Department;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;
use LogicException;

class UpdateDepartmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'parent_id' => [
                'nullable',
                'integer',
                Rule::exists('departments', 'id'),
                Rule::notIn([$this->department()->id]),
            ],
        ];
    }

    /**
     * Reject nesting a department under one of its own sub-departments.
     *
     * @return array<int, callable>
     */
    public function after(): array
    {
        return [
            function (Validator $validator): void {
                $parentId = $this->parentId();

                if ($parentId === null || $validator->errors()->has('parent_id')) {
                    return;
                }

                $parent = Department::query()->whereKey($parentId)->first();

                if ($parent !== null && $parent->hasAncestor($this->department()->id)) {
                    $validator->errors()->add('parent_id', 'A department cannot be nested under one of its own sub-departments.');
                }
            },
        ];
    }

    /**
     * The department being updated.
     */
    private function department(): Department
    {
        $department = $this->route('department');

        if (! $department instanceof Department) {
            throw new LogicException('The department route parameter is missing.');
        }

        return $department;
    }

    /**
     * The numeric parent id submitted with the request, when present.
     */
    private function parentId(): ?int
    {
        $parentId = $this->input('parent_id');

        return is_numeric($parentId) ? (int) $parentId : null;
    }
}

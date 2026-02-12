<?php

namespace App\Enums;

enum DelegationStatus: string
{
    case DRAFT = 'draft';
    case SUBMITTED = 'submitted';
    case APPROVED = 'approved';
    case REJECTED = 'rejected';
    case PDF_READY = 'pdf_ready';

    public static function options(): array
    {
        return array_map(fn($s) => [
            'value' => $s->value,   // np. "draft" → wysyłane w ?status=
            'label' => $s->label(), // np. "Szkic" → do selecta w React
            'required_level' => $s->required_level(), // np. "Szkic" → do selecta w React
        ], self::cases());
    }

    public function allowedTransitionsForLevel(int $userLevel): array
    {
        return array_filter(
            $this->allowedTransitions(),
            fn (self $toStatus) => $userLevel >= $toStatus->required_level()
        );
    }

    public function allowedTransitions(): array
    {
        return match ($this) {
            self::DRAFT => [self::SUBMITTED],
            self::SUBMITTED => [self::APPROVED, self::REJECTED],
            self::REJECTED => [self::SUBMITTED],
            self::APPROVED => [],
            self::PDF_READY => [],
        };
    }

    public function required_level(): string
    {
        return match ($this) {
            self::DRAFT => 1,
            self::SUBMITTED => 1,
            self::APPROVED => 2,
            self::REJECTED => 2,
            self::PDF_READY => 9,
        };
    }

    public function label(): string
    {
        return match ($this) {
            null => '-',
            self::DRAFT => 'Szkic',
            self::SUBMITTED => 'Wysłana',
            self::APPROVED => 'Zatwierdzona',
            self::REJECTED => 'Odrzucona',
            self::PDF_READY => 'Gotowa',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::DRAFT => 'red',
            self::SUBMITTED => 'yellow',
            self::APPROVED => 'green',
            self::REJECTED => 'red',
            self::PDF_READY => 'blue',
        };
    }
}